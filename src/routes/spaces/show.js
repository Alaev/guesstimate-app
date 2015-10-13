import React, {Component, PropTypes} from 'react'
import SpaceCanvas from 'gComponents/spaces/canvas'
import StandardDropdownMenu from 'gComponents/utility/standard-dropdown-menu'
import { connect } from 'react-redux';
import style from './style.css'
import * as spaceActions from 'gModules/spaces/actions.js'
import '../../../node_modules/react-dd-menu/dist/react-dd-menu.min.css'
import Icon from 'react-fa'

function mapStateToProps(state) {
  return {
    spaces: state.spaces
  }
}

@connect(mapStateToProps)
export default class repoShow extends Component {
  displayName: 'RepoDetailPage'
  space() {
    return this.props.spaces.asMutable().find(s => (s.id.toString() === this.props.spaceId.toString()))
  }
  destroy() {
    this.props.dispatch(spaceActions.destroy(this.space()))
  }
  render () {
    const space = this.space();
    return (
    <div>
      <div className='hero-unit'>
        <div className='container-fluid'>
          <div className='ui secondary menu'>
            <div className='item'>
              <h1> {space ? space.name : ''} </h1>
            </div>
            <div className='item'>
            <StandardDropdownMenu toggleButton={<a href=''className='ui button small blue'> Settings </a>}>
                <li><a href='' onClick={this.destroy.bind(this)}> Delete </a></li>
              </StandardDropdownMenu>
            </div>
            <div className='right  menu'>
              <div className='item'>
                <div className='user-tag'>
                  <img className='ui avatar image' src={space.user.picture}/>
                  {space.user.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      { space && <SpaceCanvas spaceId={space.id}/>}
      </div>
    )
  }
}
