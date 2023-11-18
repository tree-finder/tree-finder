import {
    TreeFinderBreadcrumbsElement,
    TreeFinderFilterElement,
    TreeFinderFiltersElement,
    TreeFinderGridElement,
    TreeFinderPanelElement,
} from "../../src/index";

describe("testing index file's export set", () => {
    test("tree finder elements should be defined", () => {
        // NOTE this is a bit of a dumb test as ts will check for us,
        // but we will add more unit tests soon.
        expect(TreeFinderBreadcrumbsElement).toBeDefined();
        expect(TreeFinderFilterElement).toBeDefined();
        expect(TreeFinderFiltersElement).toBeDefined();
        expect(TreeFinderGridElement).toBeDefined();
        expect(TreeFinderPanelElement).toBeDefined();
    });
});
