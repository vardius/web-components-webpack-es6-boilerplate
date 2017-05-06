import jq from 'jquery';
import {JSDOM} from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

const dom = new JSDOM('<!doctype html><html><body></body></html>');

// Global prerequisites to make it work in the command line
global.document = dom.window.document;
global.window = global.document.defaultView;
const $ = jq(window);

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { expect };