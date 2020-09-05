// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// When updating @testing-library/react to v10, the breaking change
// was internally updating @testing-library/dom to v7. This update
// removes the MutationObserver shim. A few options have been given to
// projects that use react-scripts. This is one of the options to avoid
// MutationObserver errors.
// When this PR has been merged: https://github.com/facebook/create-react-app/pull/8362
// we can safely remove this workaround and the dependency.
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
