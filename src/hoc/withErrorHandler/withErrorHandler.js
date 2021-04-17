import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        // componentWillMount() is deprecated
        constructor(props) {
            super(props);

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            // remove old interceptors
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            // this.reqInterceptor = axios.interceptors.request.use(req => {
            //     this.setState({error: null});
            //     return req;
            // });

            // this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            //     this.setState({error: error});
            // });

            return (
                <Auxillary>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxillary>
            );
        }
    }
}

export default withErrorHandler;