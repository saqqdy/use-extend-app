import type { VNode, Vue2, createVNode } from 'vue-demi'
import Mount, { type Options } from 'vue-mount-plugin'
import extend from 'js-cool/lib/extend'

export type CreateVNodeParameters = Parameters<typeof createVNode>
export type Component = CreateVNodeParameters['0']

let instance: VNode | typeof Vue2 | null
const defaultOptions = {} as Options

function useExtendApp(component: Component, options?: Options) {
	options = extend(true, defaultOptions, options) as unknown as Options

	/**
	 * open
	 */
	function open() {
		if (!instance) instance = new Mount(component, options)
		instance.mount()
	}

	/**
	 * close
	 */
	function close() {
		instance && instance.destroy()
		instance = null
	}

	return {
		open,
		close
	}
}

export default useExtendApp
