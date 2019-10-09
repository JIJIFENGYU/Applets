import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

const images = ['../images/9.jpg','../images/10.jpg','../images/11.jpg'];
export default class MySwiper extends Component {



    constructor(props) {
        super(props);
        this.state = {
            images: ['../images/9.jpg','../images/9.jpg','../images/9.jpg','../images/9.jpg'
            ],
            iamgeList: [
                {
                    uri: require('../images/8.jpg'),
                },
                {
                    uri: require('../images/9.jpg'),
                },
                {
                    uri: require('../images/10.jpg'),
                },
                {
                    uri: require('../images/11.jpg'),
                },
                {
                    uri: require('../images/12.jpg'),
                },
            ],
            circleWidth: 10,
            circleMargin: 3,
            currentPage: 0,
        };
    }

    componentDidMount() {
        this._startTimer();
    }

    componentWillUnmount() {
        this._endTimer();
    }

    _startTimer = () => {
        setInterval(() => {
            let nextPage = this.state.currentPage + 1;
            nextPage = nextPage > (this.state.images.length - 1)?0 : nextPage;
            this.setState({currentPage: nextPage});
            let offsetX = Dimensions.get('window').width * this.state.currentPage;
            this.refs.scrollView.scrollTo({
                x: offsetX,
                y: 0,
                animated: true,
            })

        },2000)
    }

    _endTimer = () => {

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollView}
                    horizontal={true}//横线滚动
                    showsHorizontalScrollIndicator={false}//隐藏水平方向滚动条
                    pagingEnabled={true}//分页显示
                    ref='scrollView'
                >
                    {this.renderChildView()}
                </ScrollView>
                <View style={[styles.circleArr, {left: this._getLeftOffset()}]}>
                    {
                        (() => {
                            const circleStyle = {
                                width: this.state.circleWidth,
                                height: this.state.circleWidth,
                                marginHorizontal: this.state.circleMargin,
                                borderRadius: this.state.circleWidth / 2,
                            }
                            return this.state.images.map((item, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            styles.circle, 
                                            circleStyle, 
                                            index === this.state.currentPage? styles.circleActive : {}
                                        ]}
                                    />
                                );
                            });
                        })()
                    }
                </View>
                <TouchableOpacity style={styles.leftArrow}>
                    <Image style={{width:'100%', height:'100%'}} source={require('../images/left_arrow.png')}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rightArrow} >
                    <Image style={{width:'100%', height:'100%'}}source={require('../images/right_arrow.png')}/>
                </TouchableOpacity>
            </View>
        );

    }

    _getLeftOffset = () => {
        const picNum = this.state.images.length;
        const leftOffset = (Dimensions.get('window').width -20 - picNum*(this.state.circleWidth + this.state.circleMargin*2))/2;
        return leftOffset;
    }

    renderChildView = () => {
        return this.state.images.map((item, index) => {
            return (
                <View key={index} style={styles.item}>
                    <Image
                        style={[styles.image,{resizeMode: 'cover'}]}
                        //source={{uri: '../images/9.jpg'}}
                        source={require('../images/11.jpg')}
                        source={item.uri}
                        //resizeMode='cover'
                    />

                </View>
            );
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    scrollView: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    item: {
        //flex: 1,
        width: Dimensions.get('window').width,
        paddingHorizontal: 10,
        height: 300,

    },
    image: {
        width: '100%',
        height: '100%',
    },
    circleArr: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
    },
    circle: {
        // marginHorizontal: 3,
        // width: 10,
        // height: 10,
        // borderRadius: 5,
        backgroundColor: '#e5e5e5',
    },
    circleActive: {
        backgroundColor: '#41be57',
    },
    leftArrow: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: 20,
        top: 135,
    },
    rightArrow: {
        position: 'absolute',
        width: 30,
        height: 30,
        right: 20,
        top: 135,
    },
});
