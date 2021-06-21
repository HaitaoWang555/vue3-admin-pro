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
    const renderIcon = () => {
      if (props.icon) {
        if (props.icon.includes('el-icon')) {
          return <i class={[props.icon, 'sub-el-icon']} />
        } else {
          return <svg-icon icon-class={props.icon} />
        }
      }
    }
    const renderTitle = () => {
      if (props.title) {
        return <span slot="title">{props.title}</span>
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
