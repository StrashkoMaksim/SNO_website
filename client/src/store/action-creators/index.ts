import * as NewsActionCreators from './news'
import * as SupervisorActionCreators from './supervisor'
import * as UserActionCreators from './user'

export default {
    ...NewsActionCreators,
    ...SupervisorActionCreators,
    ...UserActionCreators
}