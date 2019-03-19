import { shallowMount } from '@vue/test-utils'
import Stop from '@/components/list-elements/Stop.vue'

describe('Stop', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Stop, {
      propsData: {
        stop: {
          name: 'Scott Hall',
          campus: 'College Ave'
        }
      }
    })
    expect(wrapper.contains('div')).toBe(true)
  })
})
