const loadNote = note => (
  {
    type: 'LOAD_NOTE',
    note
  }
)

const resetNote = () => (
  {
    type: 'RESET_NOTE'
  }
)

const changeColorNote = (color) => (
  {
    type: 'CHANGE_COLOR_NOTE',
    color
  }
)

export { loadNote, resetNote, changeColorNote }