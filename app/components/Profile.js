var React = require('react-native');
var ProgressBar = require('react-native-progress-bar');
var Button = require('react-native-button');
var View = React.View;
var Text = React.Text;
var Image = React.Image;
var ListView = React.ListView;
var StyleSheet = React.StyleSheet;
var TouchableOpacity = React.TouchableOpacity;

var Profile = React.createClass({
  getInitialState: function () {
    var ds = new ListView.DataSource({
      rowHasChanged: function (row1, row2) {
        return row1 !== row2;
      }
    });
    var mocks = [];
    for (var i = 0; i < 4; i++) {
      mocks.push('Badge');
    }
    return {
      progress: 0.75,
      dataSource: ds.cloneWithRows(mocks)
    }
  },
  componentDidMount: function () {

    // Progress bar doesn't appear filled unless it's changed
    // so upon component mount, add and subtract trivial amount
    this.setState({ progress: this.state.progress + 0.00001 });
    this.setState({ progress: this.state.progress - 0.00001 });
  },
  renderRow: function (rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        onPress={function () { console.log('rowData:', rowData, 'sectionID:', sectionID, 'rowID:', rowID); }}
      >
        <View style={styles.recentlyEarned}>
          <Text>
            {rowData}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
  render: function () {
    console.log(this.props.handleLogout);
    return (
      <View>
        <View style={styles.avatar}>
          <TouchableOpacity>
            <Text style={styles.avatarText}>
              Add Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recent}>
          <Text style={styles.header}>
            Recently Earned Badges
          </Text>
          <ListView
            dataSource={this.state.dataSource}
            initialListSize={4}
            pageSize={4}
            renderRow={this.renderRow}
            scrollEnabled={false}
            contentContainerStyle={styles.recentBadges}
          />
        </View>
        <View>
          <Text style={styles.header}>
            1 more completion for (insert awesome badge)
          </Text>
          <ProgressBar
            fillStyle={styles.progressFill}
            backgroundStyle={styles.progress}
            style={{marginTop: 10, width: 300, height: 10}}
            progress={this.state.progress}
          />
        </View>
        <View style={styles.streaks}>
          <Text>
            Current Streak: 3
          </Text>
          <Text>
            Perfect day streak: 2
          </Text>
        </View>
        <Button
          containerStyle={styles.logoutContainer}
          style={styles.logoutText}
          onPress={this.props.handleLogout}
        >
          Logout
        </Button>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  avatar: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    backgroundColor: '#EEE',
    borderRadius: 100/2,
    borderColor: '#FFF',
    borderWidth: 1,
    marginBottom: 70
  },
  avatarText: {
    fontSize: 10,
    width: 60,
    textAlign: 'center'
  },
  header: {
    textAlign: 'center',
  },
  progressFill: {
    backgroundColor: '#6399DC',
    height: 10
  },
  progress: {
    backgroundColor: '#aaa',
    borderRadius: 7,
    alignSelf: 'center'
  },
  recent: {
    marginBottom: 30,
  },
  recentlyEarned: {
    justifyContent: 'center',
    backgroundColor: '#eee',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 4,
    height: 60,
    width: 60,
  },
  recentBadges: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  streaks: {
    marginVertical: 40,
  },
  logoutContainer: {
    height: 35,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#6399DC',
    marginTop: 60
  },
  logoutText: {
    fontSize: 14,
    color: '#fff'
  }
});

module.exports = Profile;
