import '../../common/template/dependecies'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'

import If from '../../common/operator/if'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }

    changeOpen() {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { name, email } = this.props.user
        const validToken = this.props.validToken
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li className={`dropdown user user-menu ${this.state.open ? 'open' :
                        ''}`}>

                        <a href="javascript:;" onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            <img src="img/user.png" width='18px' height='18px' />
                        </a>
                        <ul className="dropdown-menu" height='200px'>
                            <li className="user-header">
                                <img src="img/user.png" />
                                <If test={validToken}>
                                    <div className=''>
                                        <p>{name}<small>{email}</small></p>
                                    </div>
                                </If>
                                <If test={!validToken}>
                                    <div className="button-login">
                                        <a href="#" onClick={this.props.logout}
                                            className="btn btn-default btn-flat">Login</a>
                                    </div>
                                </If>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">

                                    <If test={validToken}>
                                        <a href="#" onClick={this.props.logout}
                                            className="btn btn-default btn-flat">Sair</a>
                                    </If>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div >

        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user, validToken: state.auth.validToken })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
