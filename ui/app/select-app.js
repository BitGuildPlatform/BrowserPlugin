const inherits = require('util').inherits
const Component = require('react').Component
const connect = require('react-redux').connect
const h = require('react-hyperscript')
const { HashRouter } = require('react-router-dom')
const App = require('./app')
const { setFeatureFlag } = require('./actions')
const I18nProvider = require('./i18n-provider')

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    setFeatureFlagWithModal: () => {
      return dispatch(setFeatureFlag('betaUI', true, 'BETA_UI_NOTIFICATION_MODAL'))
    },
    setFeatureFlagWithoutModal: () => {
      return dispatch(setFeatureFlag('betaUI', true))
    },
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectedApp)

inherits(SelectedApp, Component)
function SelectedApp () {
  Component.call(this)
}

SelectedApp.prototype.componentWillReceiveProps = function (nextProps) {
  const {
    setFeatureFlagWithoutModal,
  } = this.props

  setFeatureFlagWithoutModal()
}

SelectedApp.prototype.render = function () {
  return h(HashRouter, {
      hashType: 'noslash',
    }, [
      h(I18nProvider, [ h(App) ]),
    ])
}
