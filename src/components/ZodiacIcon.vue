<template>
  <div>
    <component :is="iconComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import AriesIcon from './icons/AriesIcon.vue'
import GeminiIcon from '@/components/icons/GeminiIcon.vue'
import CancerIcon from '@/components/icons/CancerIcon.vue'
import TaurusIcon from '@/components/icons/TaurusIcon.vue'
import LeoIcon from './icons/LeoIcon.vue'
import VirgoIcon from './icons/VirgoIcon.vue'
import LibraIcon from '@/components/icons/LibraIcon.vue'
import ScorpioIcon from './icons/ScorpioIcon.vue'
import SagittariusIcon from './icons/SagittariusIcon.vue'
import CapricornIcon from './icons/CapricornIcon.vue'
import AquariusIcon from './icons/AquariusIcon.vue'
import PiscesIcon from './icons/PiscesIcon.vue'

const icons: { [key: string]: Component } = {
  aries: AriesIcon,
  taurus: TaurusIcon,
  gemini: GeminiIcon,
  cancer: CancerIcon,
  leo: LeoIcon,
  virgo: VirgoIcon,
  libra: LibraIcon,
  scorpio: ScorpioIcon,
  sagittarius: SagittariusIcon,
  capricorn: CapricornIcon,
  aquarius: AquariusIcon,
  pisces: PiscesIcon
}

const props = defineProps(['sign'])

const iconComponent = computed(() => {
  const sign = props.sign.toLowerCase()
  return icons[sign] ? icons[sign] : null
})
</script>
