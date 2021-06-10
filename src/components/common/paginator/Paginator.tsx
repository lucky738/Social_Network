import React, { FC, useState } from "react"
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    currentPage?: number
    totalItemsCount: number
    pageSize: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let Paginator: FC<PropsType> = ({ currentPage = 1, totalItemsCount, pageSize,
    onPageChanged = x => x,
    portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    // количество порций по 10 штук
    let [portionNumber, setPortionNumber] = useState(1)
    //portionpNumber Указывает какая именно порция выведена на экран EX: 
    // первая: от 1 до 10 или вторая от 11 до 20
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    // первый элемент порции, к примеру, для первой это 1, а для второй это 11 
    let rightPortionPageNumber = portionNumber * portionSize
    // последний элемент порции, к примеру, для первой это 10, а для второй это 20

    return (
        <div className={styles.paginator}>
            {
                portionNumber > 1 &&
                <span className={styles.prevNextButtons}
                    onClick={() => { setPortionNumber(portionNumber - 1) }}>prev</span>
            }
            {
                pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span className={cn({ [styles.selectedPage]: currentPage === p },
                            styles.pageNumber)}
                            key={p}
                            onClick={e => onPageChanged(p)} >{p}</span>
                    })
            }
            {
                portionNumber < portionCount &&
                <span className={styles.prevNextButtons}
                    onClick={() => { setPortionNumber(portionNumber + 1) }}>next</span>
            }
        </div>
    )
}

export default Paginator;