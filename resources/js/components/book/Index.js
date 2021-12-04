import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'
import axios from 'axios'

class Index extends Component
{
	constructor()
	{
		super();
		//--- Declare state variable for this component ---//
		this.state = {
			Books     : [],
			editBooks : {}
		}
		//--- Declare method for this component ---//
		this.handleUpdateState = this.handleUpdateState.bind(this);
	}
	//--- Fetch all books info before the component render ---//
	componentDidMount()
	{
		
		axios.get('/api/books')
			.then(response => {
				this.setState({
					Books : response.data
				})
			})
	}
	//--- Update state variable while any book insert or update ---//
	handleUpdateState(data, operation)
	{
		//--- 'operation==1' means update user ---//
		if(operation === 1) {
			this.setState(prevState => ({
				Books : prevState.Books.filter(book => {
					if(book.id === data.id)
						return Object.assign(book, data);
					else
						return book;
				})
			}))
			return;
		}
		//--- 'operation==0' means insert book ---//
		var new_books = this.state.Books.concat(data);
		this.setState({
			Books : new_books
		})
	}
	// //--- Find editable user and update state variable ---//
	// handleEditBook(bookId)
	// {
	// 	axios.get(`/api/books/${bookId}/edit`)
	// 		.then(response => {
	// 			this.setState({
	// 				editBooks : response.data
	// 			})
	// 		})
	// }
	// //--- Delete user and update state ---//
	// handleDeleteBook(bookId)
	// {
	// 	axios.delete(`/api/books/${bookId}`)
	// 		.then(response => {
	// 			toastr.error('book has been deleted successfully!', {position : 'top-right', heading: 'Done'});
				
	// 			this.setState(prevState => ({
	// 				Books : prevState.Books.filter(book => {
	// 					return book.id !== bookId
	// 				})
	// 			}))
	// 		})
	// }

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Books </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Add book </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Name </th>
                                    <th> author </th>
                                    <th> description </th>
                                    <th> image </th>

                                </tr>
                            </thead>
                            <tbody>
                            {this.state.Books.map((book, i) => (
                                <tr key={i}>
                                    <td> {book.id} </td>
                                    <td> {book.name} </td>
                                    <td> {book.author.full_name} </td>
									<td> {book.description} </td>
									<td> <img src={book.image} width='50px' height="50px"/> </td>

                                    {/* <td>
                                        <button className="btn btn-secondary btn-sm mr-2" onClick={this.handleEditBook.bind(this, book.id)} data-toggle="modal" data-target="#editModal"> Edit </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteBook.bind(this, book.id)}> Delete </button>
                                    </td> */}
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    {/* <Edit updateState = {this.handleUpdateState} book = {this.state.editBooks} /> */}
			</div>
        )
    }
}
export default Index