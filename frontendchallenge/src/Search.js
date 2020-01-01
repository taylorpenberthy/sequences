import React, { Component } from "react";
import MySequences from './MySequences/MySequences'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: {}
        }
     }
    handleChange =(event) => {
        this.setState({
            query: event.target.value
        })
    }
    showReceipt = (receipt) => {
        let target = receipt.person.toLowerCase();
        let term = this.state.query.toLowerCase();
       return (
           target.search(term) !== -1
       )
    }
    showReceipts= (receipts) => {
        return (
        receipts.map(receipt => {
            if (this.showReceipt(receipt)) {
              return (
                <div className="container">
                  <Receipt
                    person={receipt.person}
                    main={receipt.order.main}
                    protein={receipt.order.protein}
                    rice={receipt.order.rice}
                    sauce={receipt.order.sauce}
                    drink={receipt.order.drink}
                    cost={receipt.order.cost}
                  />
                  </div>
              )}}))}

    render() {
        return (
            <div>
            <form>
                <input placeholder="Search" onChange={event => this.handleChange(event)} onKeyPress={this.props.onKeyPress}
                value={this.props.query}/>
            </form>
                {this.showReceipts(this.props.content)}
            </div>
        )
    }

}

export default Search