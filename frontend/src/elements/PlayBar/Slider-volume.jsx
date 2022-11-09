import React from 'react'


function Slider_volume({statevolum, onVolumeChange}) {

  return (
      <div className='slider-volume-container'>
      <div className='slider-volume-elem'>

          <input
              value={Math.round(statevolum * 100)}
              type="range"
              className='slider-volume'
              onChange={onVolumeChange}
          />

      </div>
          </div>
  )
}

export default Slider_volume
