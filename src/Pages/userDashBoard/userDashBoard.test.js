import React from "react";
import { shallow } from "enzyme";
import UserDashBoard from "./userDashBoard";

describe("UserDashBoard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserDashBoard />);
    expect(wrapper).toMatchSnapshot();
  });
});
