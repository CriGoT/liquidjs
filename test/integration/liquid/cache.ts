import { expect } from 'chai'
import { Liquid } from '../../../src/liquid'
import { mock, restore } from '../../stub/mockfs'

describe('LiquidOptions#cache', function () {
  afterEach(restore)

  describe('#renderFile', function () {
    it('should be disabled by default', async function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html'
      })
      mock({ '/root/files/foo.html': 'foo' })
      const x = await engine.renderFile('files/foo')
      expect(x).to.equal('foo')
      mock({ '/root/files/foo.html': 'bar' })
      const y = await engine.renderFile('files/foo')
      expect(y).to.equal('bar')
    })
    it('should respect cache=true option', async function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html',
        cache: true
      })
      mock({ '/root/files/foo.html': 'foo' })
      const x = await engine.renderFile('files/foo')
      expect(x).to.equal('foo')
      mock({ '/root/files/foo.html': 'bar' })
      const y = await engine.renderFile('files/foo')
      expect(y).to.equal('foo')
    })
    it('should not cache not exist file', async function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html',
        cache: true
      })
      try { await engine.renderFile('foo') } catch (err) {}

      mock({ '/root/foo.html': 'foo' })
      const y = await engine.renderFile('foo')
      expect(y).to.equal('foo')
    })
  })

  describe('#renderFileSync', function () {
    it('should be disabled by default', function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html'
      })
      mock({ '/root/foo.html': 'foo' })
      const x = engine.renderFileSync('foo')
      expect(x).to.equal('foo')

      mock({ '/root/foo.html': 'bar' })
      const y = engine.renderFileSync('foo')
      expect(y).to.equal('bar')
    })
    it('should respect cache=true option', function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html',
        cache: true
      })
      mock({ '/root/foo.html': 'foo' })
      const x = engine.renderFileSync('foo')
      expect(x).to.equal('foo')

      mock({ '/root/foo.html': 'bar' })
      const y = engine.renderFileSync('foo')
      expect(y).to.equal('foo')
    })
    it('should not cache not exist file', async function () {
      const engine = new Liquid({
        root: '/root/',
        extname: '.html',
        cache: true
      })
      try { engine.renderFileSync('foo') } catch (err) {}

      mock({ '/root/foo.html': 'foo' })
      const y = await engine.renderFile('foo')
      expect(y).to.equal('foo')
    })
  })
})
