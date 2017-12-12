import React from 'react';
import { connect } from 'dva';
import { Table, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';

function stuIndexPage({ dispatch, stuIndexPage}) {

	const  { a } = stuIndexPage;

	const renderContent = (value, row, index) => {
	  	const obj = {
	    	children: value,
	    	props: {},
	  	};
	  	if (index === 4) {
	    	obj.props.colSpan = 0;
	  	}
	  	return obj;
	}

	const columns = [
		{
	  		title: 'Other',
	  		children: [{
		    		title: 'Age',
		    		dataIndex: 'age',
		    		key: 'age',
		    		width: 150,
		  		}, {
		    	title: 'Address',
		    	children: [{
			      		title: 'Street',
			      		dataIndex: 'street',
			     		key: 'street',
			      		width: 150,
			      		render: (text, row, index) => {
						    if (index == 4) {
						      	return {
							      	children: <a href="#">{text}</a>,
							      	props: {
							        	rowSpan: 2
							      	}
						    	}
						    }
						    if(index == 5){
								return {
							      	children: <a href="#">{text}</a>,
							      	props: {
							        	rowSpan: 0
							      	}
						    	}						    	
						    }
						    return <a href="#">{text}</a>;
						}
			    	}, {
			      	title: 'Block',
			      	children: [{
			        	title: 'Building',
			        	dataIndex: 'building',
			        	key: 'building',
			        	width: 150
			      	}, {
			        	title: 'Door No.',
			        	dataIndex: 'number',
			        	key: 'number',
			        	width: 150
			      	}],
			    }],
		  	}],
		},
		{
	  		title: 'Company',
	  		children: [
	  			{
		    		title: 'Company Address',
		    		dataIndex: 'companyAddress',
		    		width: 150,
		    		key: 'companyAddress',
					render: (text, row, index) => {
					    if (index == 4) {
					      	return {
						      	children: <a href="#">{text}</a>,
						      	props: {
						        	colSpan: 2
						      	}
					    	}
					    }
					    return <a href="#">{text}</a>;
					}		    		
		  		}, 
		  		{
		    		title: 'Company Name',
		    		dataIndex: 'companyName',
		    		width: 150,
		    		key: 'companyName',
					render: (text, row, index) => {
					    if (index == 4) {
					      	return {
						      	children: <a href="#">{text}</a>,
						      	props: {
						        	colSpan: 0
						      	}
					    	}
					    }
					    return <a href="#">{text}</a>;
					}		    		
		  		}
		  	]
		}, 
	];

	const data = [];

	for (let i = 0; i < 10; i++) {
	  	data.push({
		    key: i,
		    age: i + 1,
		    street: 'Lake ',
		    building: 'C',
		    number: 2035,
		    companyAddress: 'Lake Street 42',
		    companyName: 'SoftLake Co',
	  	});
	}

  	return (
    	<Table
		    columns = {columns}
		    dataSource = {data}
		    bordered
		    size = "middle"
		    scroll = {{ x: '100%', y: 460 }}
		    pagination={ false }
	  	/>
  	);
}


function mapStateToProps({ stuIndexPage }){
    return {
      	stuIndexPage
    };
}
export default  connect(mapStateToProps)(stuIndexPage);