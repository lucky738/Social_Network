import React from 'react';
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="lucky" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("lucky");
    })

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="lucky" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.length).not.toBeNull();
    })

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="lucky" />);
        const root = component.root;
        
        expect(() => {
            let input = root.findByType("input")
        }).toThrow();
    })

    test("after creation <span> should contains correct status", () => {
        const component = create(<ProfileStatus status="lucky" />);
        const root = component.root;
        let span = root.findByType("span")
        expect(span.children[0]).toBe("lucky");
    })

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status="lucky" />);
        const root = component.root;
        let span = root.findByType("span")
        span.props.onDoubleClick();
        let input = root.findByType("input")
        expect(input.props.value).toBe("lucky");
    })
    
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="lucky" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deacitvateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    })
});