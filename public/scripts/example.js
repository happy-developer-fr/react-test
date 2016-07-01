var rootUrl = "http://swapi.co/api/people";

var Hero = React.createClass({
  render: function(){
    return (
      <div> I am {this.props.name}</div>
    )
  }
});

var HeroList = React.createClass({
  render: function(){
    if(this.props.data.results){
      var i = 0;
      var heroes = this.props.data.results.map(function(hero){
        return (
          <Hero name={hero.name} key={i++}/>
        );
      });
    }
    return (<div class="HeroList">
        {heroes}
    </div>);
  }
});

var HeroBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadDocumentFromServer:function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadDocumentFromServer();
  },
  render: function(){
    return(
      <HeroList data={this.state.data}/>
    );
  }
});

ReactDOM.render(
  <HeroBox url="http://swapi.co/api/people"/>,

  document.getElementById('content')
);
