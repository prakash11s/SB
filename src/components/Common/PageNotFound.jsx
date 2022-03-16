import React from 'react';
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
	const history = useHistory();
    return(
      <div className="container mb-5">
	    <div className="row">
		    <div className="col-12 col-md-11 col-lg-7 col-xl-6 mx-auto">
			    <div className="app-branding text-center mb-5">
		            <a className="app-logo" href="index.html"><img className="logo-icon me-2" src="assets/img/app-logo.png" alt="logo"/><span className="logo-text">Soul Business</span></a>
		        </div>
			    <div className="app-card p-5 text-center shadow-sm">
				    <h1 className="page-title mb-4">404<br/><span className="font-weight-light">Page Not Found</span></h1>
				    <div className="mb-4">
					    Sorry, we can't find the page you're looking for. 
				    </div>
				    <button className="btn app-btn-primary" onClick={() => history.goBack(-1) }>Go to previous page</button>
			    </div>
		    </div>
	    </div>
    </div>
    );
}
export default PageNotFound;