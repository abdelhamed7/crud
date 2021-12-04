import React, { Component } from "react";
import toastr from "cogo-toast";

class Create extends Component {
    constructor() {
        super();
        //--- Declare state variable for this component ---//
        this.state = {
            errors: [],
            name: "",
            description: "",
            image: [],
            author_id: ""
        };
        //--- Declare method for this component ---//
        this.baseState = this.state;
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleInsertBook = this.handleInsertBook.bind(this);
        this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    }
    //--- Update state variable value while input field change ---//
    handleInputFieldChange(e) {
		if(e.target.name == 'image'){
			let image = e.target.files
			let fd = new FormData()
			fd.append("image", image);
		
			this.setState({
				image: fd
			});
		}

		
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //--- Insert new user in users state array by props method ---//
    handleInsertBook(e) {
        e.preventDefault();


        const data = {
            name: this.state.name,
            description: this.state.description,
             image: this.state.image,
            author_id: this.state.author_id
        };

        axios
            .post("/api/books", data)
            .then(repsonse => {
                this.setState(this.baseState);
                delete repsonse.data.created_at;
                delete repsonse.data.updated_at;
                this.props.updateState(repsonse.data, 0);

                document.getElementById("closeAddModal").click();
                toastr.success("New book added successfully!", {
                    position: "top-right",
                    heading: "Done"
                });
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }
    //--- Check that any validation errors occure for input field ---//
    hasErrorFor(fieldName) {
        return !!this.state.errors[fieldName];
    }
    //--- Render error for specific validation fail input field ---//
    renderErrorFor(fieldName) {
        if (this.hasErrorFor(fieldName)) {
            return (
                <em className="error invalid-feedback">
                    {" "}
                    {this.state.errors[fieldName][0]}{" "}
                </em>
            );
        }
    }

    render() {
        return (
            <div
                className="modal fade"
                id="addModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Book</h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={this.handleInsertBook}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label
                                        htmlFor="name"
                                        className="col-form-label"
                                    >
                                        Name{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-sm ${
                                            this.hasErrorFor("name")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="name"
                                        name="name"
                                        placeholder=" name"
                                        onChange={this.handleInputFieldChange}
                                        value={this.state.name}
                                    />
                                    {this.renderErrorFor("name")}
                                </div>
								<div className="form-group">
                                    <label
                                        htmlFor="description"
                                        className="col-form-label"
                                    >
                                        description{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-sm ${
                                            this.hasErrorFor("description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="description"
                                        name="description"
                                        placeholder=" description"
                                        onChange={this.handleInputFieldChange}
                                        value={this.state.description}
                                    />
                                    {this.renderErrorFor("description")}
                                </div>
								<div className="form-group">
                                    <label
                                        htmlFor="image"
                                        className="col-form-label"
                                    >
                                        image{" "}
                                    </label>
                                    <input
                                        type="file"
                                        className={`form-control form-control-sm ${
                                            this.hasErrorFor("image")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="image"
                                        name="image"
                                        placeholder=" image"
                                        onChange={this.handleInputFieldChange}
                                        value={this.state.image}
                                    />
                                    {this.renderErrorFor("image")}
                                </div>


								<div className="form-group">
                                    <label
                                        htmlFor="author_id"
                                        className="col-form-label"
                                    >
                                        author_id{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-sm ${
                                            this.hasErrorFor("author_id")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="author_id"
                                        name="author_id"
                                        placeholder=" author"
                                        onChange={this.handleInputFieldChange}
                                        value={this.state.author_id}
                                    />
                                    {this.renderErrorFor("author_id")}
                                </div>	


                                </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    id="closeAddModal"
                                    className="btn btn-secondary btn-sm"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                >
                                    Save author
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Create;
