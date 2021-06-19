import React from 'react'
import './CoinInfo.css'

import { numberWithCommas } from '../../utils/HelperFunctions'

const CoinInfo = ({ props: { symbolData, symbol } }) => {
  const currentlySelectedSymbol =
    symbolData && symbolData.conversionData && symbolData.conversionData.symbol

  return (
    <>
      {symbolData && symbolData.conversionData ? (
        <div className="info">
          <div style={{ display: 'flex' }}>
            <img
              style={{ alignSelf: 'center', marginRight: '5px' }}
              src={symbolData.generalData[currentlySelectedSymbol].logo.replace(
                '64x64',
                '32x32'
              )}
              alt={`${symbolData.generalData[currentlySelectedSymbol].name} Logo`}
            />
            <h3>{`${symbolData.generalData[currentlySelectedSymbol].name} (${symbolData.generalData[currentlySelectedSymbol].symbol})`}</h3>{' '}
          </div>
          {symbolData.generalData[currentlySelectedSymbol].twitter_username && (
            <a
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none' }}
              href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
            >
              <div className="twitterButton">
                <img
                  src="/images/twitter-128.png"
                  alt="Twitter Logo"
                  style={{ width: '30px', marginRight: '5px' }}
                />
                <h4>{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</h4>
              </div>
            </a>
            // {/* // <a
            // //   target="blank"
            // //   href={`https://twitter.com/@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}
            // // >{`@${symbolData.generalData[currentlySelectedSymbol].twitter_username}`}</a> */}
          )}
          <h5 style={{ fontWeight: 'bold' }}>
            {symbolData.conversionData.quote['USD'].price
              ? `1 ${
                  symbolData.generalData[currentlySelectedSymbol].symbol
                }: ${numberWithCommas(
                  symbolData.conversionData.quote['USD'].price.toFixed(2)
                )} USD`
              : 'Price information not available'}
          </h5>
          {symbolData.generalData[currentlySelectedSymbol].description ? (
            <p>{symbolData.generalData[currentlySelectedSymbol].description}</p>
          ) : (
            <p>Description not available</p>
          )}
        </div>
      ) : (
        <div className="noInfoAvailable">
          <img
            src="/images/confused.png"
            alt="Confused face"
            className="confusedFaceImg"
          />
          <h5>
            There is currently no information available about {symbol} on{' '}
            <a
              href="https://coinmarketcap.com/"
              target="_blank"
              rel="noreferrer"
            >
              CoinMarketCap
            </a>
            . A possible reason for this is that {symbol} may be too new, or
            goes by a different symbol.
          </h5>
        </div>
      )}
    </>
  )
}

export default CoinInfo
