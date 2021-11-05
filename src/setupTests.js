import Enzyme, {shallow, render, mount} from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import {store} from "./store";
import App from "./App";
import {Provider} from "react-redux";
import React from "react";
import {TodoActionTypes} from "./types/todo";

Enzyme.configure({adapter: new EnzymeAdapter()});

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

export const mountWithWrapper = component => <Provider store={store}>{component}</Provider>;