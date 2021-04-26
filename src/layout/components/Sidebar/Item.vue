<script lang="jsx">
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { icon, title } = props

    const renderIcon = () => {
      if (icon) {
        if (icon.includes('el-icon')) {
          return <i class={[icon, 'sub-el-icon']} />
        } else {
          return <svg-icon icon-class={icon} />
        }
      }
    }
    const renderTitle = () => {
      if (title) {
        return <span slot="title">{title}</span>
      }
    }

    return () => {
      return (
        <>
          {renderIcon()}
          {renderTitle()}
        </>
      )
    }
  },
}
</script>
