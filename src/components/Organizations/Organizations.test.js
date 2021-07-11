import React from "react";
import { shallow } from "enzyme";
import Organizations from "./Organizations";

describe("Organizations", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Organizations />);
    expect(wrapper).toMatchSnapshot();
  });
});
