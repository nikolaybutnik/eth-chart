import React, { useState, useEffect } from 'react'
import './App.css'

import { getGraphData } from './utils/ServerCalls'

import Graph from './components/Graph/Graph'
import SearchForm from './components/SearchForm/SearchForm'
import EthPrice from './components/EthBtcPrice/EthBtcPrice'
import GraphControls from './components/GraphControls/GraphControls'
import Favorites from './components/Favorites/Favorites'
// import { format } from 'date-fns'

function App() {
  // states for the currently selected symbol and pair
  const [symbol, setSymbol] = useState()
  const [pairSymbol, setPairSymbol] = useState()
  // state for additional data for currently selected symbol
  const [symbolData, setSymbolData] = useState()
  // states for the graph and controls
  const [graphData, setGraphData] = useState()
  const [viewOption, setViewOption] = useState('1d')
  // state for the currently selected pair, used to figure out if it's saved to favorites
  const [favStatus, setFavStatus] = useState()

  useEffect(() => {
    if (!localStorage.getItem('userFavorites')) {
      localStorage.setItem('userFavorites', '[]')
    }
  }, [])

  const currentlySelectedSymbol =
    symbolData && symbolData.conversionData && symbolData.conversionData.symbol

  // const getTestData = () => {
  //   // Binance timeframes: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h,
  //   // 6h, 8h, 12h, 1d, 3d, 1w, 1M
  //   // KuCoin timeframes: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h,
  //   // 6h, 8h, 12h, 1d, 1w
  //   fetch(`/testdata/ADA/ETH/7days/1m`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const timestamps = data.data.map((x) => {
  //         return format(x, 'm')
  //       })
  //       console.log(timestamps)
  //     })
  //     .catch((err) => console.log(err))
  // }

  return (
    <div className="container">
      <EthPrice />

      <SearchForm
        props={{
          getGraphData,
          setGraphData,
          symbol,
          setSymbol,
          pairSymbol,
          setPairSymbol,
          setSymbolData,
          viewOption,
        }}
      />

      <Favorites
        props={{
          favStatus,
          setGraphData,
          setSymbolData,
          setSymbol,
          setPairSymbol,
        }}
      />

      {/* <button onClick={() => getTestData()}>Test Button</button> */}

      {graphData && (
        <div className="graphInfoContainer">
          <div className="graph">
            <Graph props={{ graphData, favStatus, setFavStatus }} />
            <GraphControls
              props={{
                symbol,
                pairSymbol,
                setGraphData,
                viewOption,
                setViewOption,
              }}
            />
          </div>

          {symbolData && symbolData.conversionData && (
            <div className="info">
              <div style={{ display: 'flex' }}>
                <img
                  style={{ alignSelf: 'center', marginRight: '5px' }}
                  src={symbolData.generalData[
                    currentlySelectedSymbol
                  ].logo.replace('64x64', '32x32')}
                  alt={`${symbolData.generalData[currentlySelectedSymbol].name} Logo`}
                />
                <h3>{`${symbolData.generalData[currentlySelectedSymbol].name} (${symbolData.generalData[currentlySelectedSymbol].symbol})`}</h3>{' '}
              </div>
              {symbolData.generalData[currentlySelectedSymbol]
                .twitter_username && (
                <a
                  target="blank"
                  href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
                >{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</a>
              )}
              <h4>
                {symbolData.conversionData.quote['USD'].price
                  ? `1 ${
                      symbolData.generalData[currentlySelectedSymbol].symbol
                    }: ${symbolData.conversionData.quote['USD'].price.toFixed(
                      2
                    )} USD`
                  : 'Price information not available'}
              </h4>
              <p>
                {symbolData.generalData[currentlySelectedSymbol].description
                  ? symbolData.generalData[currentlySelectedSymbol].description
                  : 'Description not available'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
