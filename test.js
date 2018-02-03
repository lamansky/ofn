'use strict'

/* eslint-disable no-undefined */

const assert = require('assert')
const ofn = require('.')

describe('ofn()', function () {
  it('should throw TypeError if arg 1 is not array', function () {
    assert.throws(() => { ofn('not an array', () => {}) }, TypeError)
  })

  it('should throw Error if arg 1 has duplicates', function () {
    assert.throws(() => { ofn([0, 0], () => {}) }, Error)
  })

  it('should throw TypeError if arg 1 has non-numbers', function () {
    assert.throws(() => { ofn(['not a number'], () => {}) }, TypeError)
  })

  it('should throw TypeError if arg 1 has NaN', function () {
    assert.throws(() => { ofn([NaN], () => {}) }, TypeError)
  })

  it('should throw RangeError if arg 1 has negative numbers', function () {
    assert.throws(() => { ofn([-1], () => {}) }, RangeError)
  })

  it('should throw RangeError if arg 1 has a number >= the length of arg 1', function () {
    assert.throws(() => { ofn([1], () => {}) }, RangeError)
  })

  it('should throw TypeError if arg 2 is not a function', function () {
    ofn([0], () => {})
    assert.throws(() => { ofn([0]) }, TypeError)
  })

  it('should return a function', function () {
    assert.strictEqual(typeof ofn([], () => {}), 'function')
  })

  it('should return a wrapper with the name of the original function', function () {
    assert.strictEqual(ofn([], function original () {}).name, 'original')
  })

  it('should pass arguments based on the precedence order', function () {
    let A, B, C
    const w = ofn([2, 0, 1], (a, b = 'default', c) => {
      A = a; B = b; C = c
    })
    w(1)
    assert.strictEqual(typeof A, 'undefined')
    assert.strictEqual(B, 'default')
    assert.strictEqual(C, 1)

    A = B = C = undefined
    assert.strictEqual(typeof A, 'undefined')
    assert.strictEqual(typeof B, 'undefined')
    assert.strictEqual(typeof C, 'undefined')

    w(1, 2)
    assert.strictEqual(A, 1)
    assert.strictEqual(B, 'default')
    assert.strictEqual(C, 2)

    A = B = C = undefined
    assert.strictEqual(typeof A, 'undefined')
    assert.strictEqual(typeof B, 'undefined')
    assert.strictEqual(typeof C, 'undefined')

    w(1, 2, 3)
    assert.strictEqual(A, 1)
    assert.strictEqual(B, 2)
    assert.strictEqual(C, 3)
  })
})
