import React from 'react';
import css from 'styled-jsx/css'
import { TransitionGroup } from 'react-transition-group'
import ease from 'css-ease';

import ServiceLastFM from '../../../lib/lastfm-service';
import { resolveScopedStyles }  from '../../../lib/styled-jsx';
import Tile from '../Tile';
import TileContent from '../TileContent';
import TileHeader from '../TileHeader';
import FadeIn from '../../Transition/FadeIn';

export interface TileLastFMProps {
    username: string;
    apiKey: string;
}

export interface TileLastFMState {
    isLoaded: boolean;
    lastTrack: any;
    recentTracks: any;
    trackAlbum: string;
    trackArtist: string;
    trackImage: string;
    trackName: string; 
}

export default class TileLastFM extends React.Component<TileLastFMProps, TileLastFMState> {
    public state = {
        isLoaded: false,
        lastTrack: {},
        recentTracks: {},
        trackAlbum: "",
        trackArtist: "",
        trackImage: "",
        trackName: "", 
    }

    private service = new ServiceLastFM(this.props.apiKey);

    async componentDidMount() {
        const recentTracks = await this.service.getRecentTracks(this.props.username);
        const lastTrack = recentTracks.track[0];
        const trackName = lastTrack.name;
        const trackAlbum = `in ${lastTrack.album['#text']}`;
        const trackArtist = lastTrack.artist['#text'];
        const trackImage = lastTrack.image.filter( image => image.size === 'medium')[0]['#text'];
        const isLoaded = true;
    
        return this.setState(Object.assign({}, this.state, {
            isLoaded,
            lastTrack,
            recentTracks,
            trackAlbum,
            trackArtist,
            trackImage,
            trackName
        }));
    }

    render() {
        const headerLink = "https://www.last.fm/api";
        const headerTitle = "LastFM API";
        const containerClasses = [
            'Tile--TileLastFM',
            this.state.isLoaded ? 'is-loaded' : ''
        ]
        const details = [
            { className: "Tile__Details__Name", detail: this.state.trackName },
            { className: "Tile__Details__Artist", detail: this.state.trackArtist },
            { className: "Tile__Details__Album", detail: this.state.trackAlbum }
        ];


        const scoped = resolveScopedStyles(
            <scope>
                <style jsx>{contentStyle}</style>
            </scope>
        )

        return (
            <Tile containerClass={containerClasses.join(' ')} visible={this.state.isLoaded}>
                <TileHeader className={scoped.className}>
                    <a className="Tile__Header__Logo" href={headerLink} title={headerTitle} target="_blank" rel="noopener">
                        <Logo />
                    </a>
                </TileHeader>
                <TileContent className={scoped.className}>
                    <div className="Tile__Image">
                        <img src={this.state.trackImage} className="value" />
                    </div>
                    <TileDetails details={details} isLoaded={this.state.isLoaded} />
                </TileContent>
                <style jsx>{contentStyle}</style>
            </Tile>
        )
    }
}

const Logo = () => (
    <div className="icon">
        <svg width="708.767px" height="179.332px" viewBox="0 0 708.767 179.332">
            <g>
                <path d="M158.431,165.498l-8.354-22.708c0,0-13.575,15.14-33.932,15.14c-18.013,0-30.802-15.662-30.802-40.721
                    c0-32.106,16.182-43.591,32.107-43.591c22.969,0,30.277,14.878,36.543,33.934l8.354,26.103
                    c8.351,25.318,24.013,45.678,69.17,45.678c32.37,0,54.295-9.918,54.295-36.02c0-21.143-12.009-32.107-34.458-37.328l-16.705-3.654
                    c-11.484-2.61-14.877-7.309-14.877-15.14c0-8.875,7.046-14.096,18.533-14.096c12.529,0,19.315,4.699,20.36,15.923l26.102-3.133
                    c-2.088-23.492-18.271-33.15-44.896-33.15c-23.491,0-46.462,8.875-46.462,37.327c0,17.75,8.614,28.975,30.277,34.195l17.752,4.175
                    c13.312,3.133,17.748,8.614,17.748,16.185c0,9.656-9.396,13.572-27.146,13.572c-26.364,0-37.325-13.834-43.591-32.89l-8.614-26.101
                    c-10.961-33.934-28.452-46.463-63.169-46.463c-38.37,0-58.731,24.275-58.731,65.517c0,39.677,20.361,61.08,56.906,61.08
                    C144.333,179.332,158.431,165.498,158.431,165.498L158.431,165.498z"/>
                <path d="M46.726,153.229c-2.61,0.784-5.221,1.306-8.614,1.306c-6.265,0-10.703-2.87-10.703-10.442V1.827H0v148.792
                    c0,19.577,13.575,27.672,29.497,27.672c5.221,0,10.181-0.785,16.446-2.349L46.726,153.229L46.726,153.229z"/>
                <path d="M376.911,149.053c-6.787,4.701-12.529,7.051-20.36,7.051c-9.92,0-15.401-5.221-15.401-18.012V77.006h36.023V55.603H341.41
                    V26.625l-27.669,3.394v25.583h-17.49v21.403h17.49v66.826c0,24.02,13.834,35.5,36.284,35.5c12.269,0,23.232-2.346,31.847-7.305
                    L376.911,149.053L376.911,149.053z"/>
                <path d="M400.718,158.449c0,10.705,8.354,19.318,19.056,19.318c11.226,0,19.578-8.613,19.578-19.318
                    c0-10.963-8.353-19.313-19.578-19.313C409.072,139.136,400.718,147.486,400.718,158.449L400.718,158.449z"/>
                <path d="M467.727,77.006v99.195h27.409V77.006h30.803V55.603h-30.803V44.638c0-16.444,7.049-21.665,18.534-21.665
                    c8.092,0,13.574,1.825,19.839,5.221l4.437-22.974C530.638,1.827,522.023,0,511.582,0c-22.973,0-43.855,10.963-43.855,43.593v12.01
                    h-17.489v21.403H467.727L467.727,77.006z"/>
                <path d="M635.154,79.358c-3.133-19.578-15.923-26.629-32.63-26.629c-16.706,0-31.062,7.571-37.329,26.104l-3.393-23.23h-22.188
                    v120.598h27.409v-68.129c0-23.235,12.008-32.11,24.799-32.11c13.312,0,18.795,8.875,18.795,23.232v77.006h27.147v-68.39
                    c0-22.974,12.269-31.849,25.061-31.849c13.052,0,18.532,8.875,18.532,23.232v77.006h27.409V89.539
                    c0-25.843-15.14-36.81-35.24-36.81C656.561,52.729,641.419,60.3,635.154,79.358L635.154,79.358z"/>
            </g>
        </svg>
        <style jsx>{`
                div {
                    display: inline-block;
                    width: 68px;
                    height: 20px;
                    vertical-align: middle;
                    margin-right: 1em;
                }

                div svg {
                    width: 100%;
                    height: 100%;
                    fill: #D51007;
                }
            `}
            </style>
    </div>
)

const TileDetails = ({ details, isLoaded }) => {
    return (
        <div className="Tile__Details">
            <TransitionGroup component={null} appear={true}>
            {details.map((item, index) => (
                <FadeIn
                    key={item.className}
                    duration={350}
                    delay={ (index * 100) + 0}
                    easing={ ease['ease-out-expo'] }
                    visible={isLoaded}>
                     <p className={item.className}>{item.detail}</p>
                </FadeIn>
            ))}
            </TransitionGroup >
            <style jsx>{detailStyle}</style>
        </div>
    )
}

const contentStyle = css`
.Tile__Image {
    display: block;
    width: 64px;
    height: 64px;
    background: grey;
    flex: 0 0 auto;
    margin: auto;
    vertical-align: middle;
}

.Tile__Image img {
    display: table-cell;
}`

const detailStyle = css`
.Tile__Details {
    width: 100%;
    flex: 1 1 auto;
    padding: 0 1em;
    letter-spacing: 0;
    font-family: 'Rubik';
}

.Tile__Details p {
    display: block;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 200px;
    margin: 0;
}

.Tile__Details__Name {
    font-weight: bold;
}

.Tile__Details__Artist {
    font-weight: 300;
}

.Tile__Details__Album {
    font-size: 14px;
    font-weight: light;
}
`