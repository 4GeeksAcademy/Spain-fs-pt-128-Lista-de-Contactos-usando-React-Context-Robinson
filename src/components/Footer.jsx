import React from "react";

export const Footer = () => (
	<footer className="custom-footer py-3 text-center">
		<div className="container">
			<p className="mb-1 text-dark">
				<strong>
					Check the <a target="_blank" href="https://4geeks.com" className="footer-link">
						template documentation <i className="fa-solid fa-file ms-1"></i>
					</a> for help.
				</strong>
			</p>
			<p className="mb-0 text-dark">
				<strong>
					Made with <i className="fa fa-heart text-danger mx-1" /> by{" "}
					<a href="http://www.4geeksacademy.com" className="footer-link">4Geeks Academy</a>
				</strong>
			</p>
		</div>
	</footer>
);
