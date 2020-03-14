import { evalToken } from '../../render/expression'
import { Context } from '../../context/context'
import { identify } from '../../util/underscore'
import { FilterImplOptions } from './filter-impl-options'
import { FilterArg, isKeyValuePair } from '../../parser/filter-arg'

export class Filter {
  public name: string
  public args: FilterArg[]
  private impl: FilterImplOptions

  public constructor (name: string, impl: FilterImplOptions, args: FilterArg[]) {
    this.name = name
    this.impl = impl || identify
    this.args = args
  }
  public * render (value: any, context: Context) {
    const argv: any[] = []
    for (const arg of this.args as FilterArg[]) {
      if (isKeyValuePair(arg)) argv.push([arg[0], yield evalToken(arg[1], context)])
      else argv.push(yield evalToken(arg, context))
    }
    return this.impl.apply({ context }, [value, ...argv])
  }
}
