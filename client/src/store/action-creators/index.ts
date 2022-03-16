import * as NewsActionCreators from './news'
import * as SupervisorActionCreators from './supervisor'
import * as UserActionCreators from './user'
import * as TagActionCreators from './tag'
import * as ActivitiesActionCreators from './activities'
import * as PartnerActionCreators from './partner'

export default {
    ...NewsActionCreators,
    ...SupervisorActionCreators,
    ...UserActionCreators,
    ...TagActionCreators,
    ...ActivitiesActionCreators,
    ...PartnerActionCreators
}