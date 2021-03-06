// React Native components
var React = require('react-native');
var api = require('../lib/api');
var View = React.View;
var Text = React.Text;
var StyleSheet = React.StyleSheet;
var Navigator = React.Navigator;
var TouchableOpacity = React.TouchableOpacity;
var ListView = React.ListView;
var Image = React.Image;

// external libraries and components
var moment = require('moment');
var getInstancePeriod = require('../lib/calendar').getInstancePeriod;

// custom components and methods
var InstanceHistory = React.createClass({
  getInitialState: function () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: function (row1, row2) {
          return row1 !== row2
        }
      })
    };
  },

  componentDidMount: function () {
    var days = getInstancePeriod(this.props.habit.createdAt, moment().format());
    days.forEach(function(day) {
      this.props.instances.forEach(function (instance) {
        if (moment(day.ISOString).isSame(instance.createdAt, 'day')) {
          day.note = instance.note;
          day.done = true;
        }
      });
    }.bind(this));
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(days)
    })
  },

  renderRow: function (rowData, sectionID, rowID) {
    if (rowData.done) {
      return (
        <View style={styles.row} >
          <Text style={styles.date} >{ moment(rowData.ISOString).format('MMMM Do YYYY') }</Text>
          <Image
            source={{uri: 'http://better-habits.herokuapp.com/assets/done_green.png'}}
            style={styles.img}
          />
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <Text style={styles.date}>
          {moment(rowData.ISOString).format('MMMM Do YYYY')}
        </Text>
          <Image
            source={ {uri: 'http://better-habits.herokuapp.com/assets/done_gray.png'} }
            style={ styles.img }
          />
      </View>
    );
  },

  render: function () {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#6399DC', alignItems: 'center'}}
              routeMapper={NavigationBarRouteMapper}
            />
          }
        />
      </View>
    );
  },

  renderScene: function (route, navigator) {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={ function () { return (<View><Text style={styles.header}>{this.props.habit.action}</Text></View>)}.bind(this)}
        />
      </View>
    );
  }
});

var NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'center'}}
        onPress={function () {navigator.parentNavigator.pop()}}
      >
        <Text style={{color: 'white', margin: 10}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    return null;
  },

  Title: function (route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 18}}>
          History
        </Text>
      </TouchableOpacity>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    flex: 0.90,
    justifyContent: 'center',
    marginTop: 54,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#F6F6F6',
  },
  header: {
    padding: 10,
    margin: 5,
    fontSize: 34,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
  date: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  img: {
    position: 'absolute',
    width: 26,
    height: 26,
    right: 20,
    top: 16,
  }
});

module.exports = InstanceHistory;
