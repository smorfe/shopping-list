import React from 'react';
import './App.css';
import ShopListing from './ShopLists';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: [],
            sortDate: 'desc'
        }

        this.addShopList = this.addShopList.bind(this);
        this.deleteShopList = this.deleteShopList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sortDateChange = this.sortDateChange.bind(this);
    }   

    componentDidMount() {
        this.refs.listItem.focus();
        
    }

    handleChange(e) {
        const {  name, value, type } = e.target;
    
        this.setState({
          [name]: type === "number" ? Number(value) : value
        })

        if(name === 'sortDate') {
            this.sortDateChange(this.state.sortDate);
        }
    }

    addShopList(e) {
        e.preventDefault();

        if(this.refs.listItem.value) {
            
            var newItem = {
                text: this.refs.listItem.value,
                dateAdded: new Date(Date.now())
            }

            this.setState({
                sortDate: this.state.sortDate,
                listItems: this.state.listItems.concat(newItem)
            });

            this.refs.form.reset();
        }
    }

    deleteShopList(itemIndex) {
        this.state.listItems.splice(itemIndex, 1);
        this.setState({
            listItems: this.state.listItems
        })
    }

    sortDateChange(sort) {
        var sortDateData = this.state.listItems;
        sort = this.state.sortDate;
        if(sort === 'desc') {
            sortDateData.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        } else {
            sortDateData.sort((a, b) => a.dateAdded.getTime() - b.dateAdded.getTime());
        }

        this.setState({
            listItems: sortDateData
        })

    }

    render() {

        return (
            <div className="App">
                <h1>My Shopping List</h1>
                
                <div className="sort-date-wrapper">
                    <form ref="form" name="formList" onSubmit={this.addShopList}>
                        <input 
                        name="listItem"
                        placeholder="Add an item"
                        ref="listItem"
                        onChange={this.handleChange}
                        type="text" />

                        <input 
                            type="submit" 
                            value="Add to Shopping list" />
                    </form>

                    <div className="sort-wrapper">
                        <span>Sort by Date:</span>
                        <select 
                            name="sortDate"
                            value={this.state.sortDate}
                            onChange={this.handleChange}>
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                        </select>

                    </div>
                </div>

                <ShopListing 
                    deleteBtn={this.deleteShopList}
                    items={this.state.listItems} />
            </div>
        );
    }
}

export default App;
