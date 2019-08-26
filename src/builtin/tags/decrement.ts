import { assert } from '../../util/assert'
import { identifier } from '../../parser/lexical'
import { Emitter, TagToken, Context, ITagImplOptions, Hash } from '../../types'
import { isNumber, stringify } from '../../util/underscore'

export default {
  parse: function (token: TagToken) {
    const match = token.args.match(identifier) as RegExpMatchArray
    assert(match, `illegal identifier ${token.args}`)
    this.variable = match[0]
  },
  render: function (context: Context, hash: Hash, emitter: Emitter) {
    const scope = context.environments
    if (!isNumber(scope[this.variable])) {
      scope[this.variable] = 0
    }
    emitter.write(stringify(--scope[this.variable]))
  }
} as ITagImplOptions
