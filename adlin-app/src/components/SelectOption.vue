 <template>
  <select v-model="selectedOption" @input="$emit('selectedOption', $event.target.value)">
    <option v-for="option of listOfOptions" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'SelectOption',
  data() {
    return {
      selectedOption: '',
    }
  },
  props: {
    listOfOptions: Array,
  },
  methods: {
    selectOption() {
      return this.selectedOption
    },
  },
}
</script>
