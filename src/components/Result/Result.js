import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API } from '../../api/api'
import Preloader from '../Common/Preloader/Preloader'
import './Result.css'

const Result = () => {
  const [result, setResult] = useState(null)
  const [selectedImageId, setSelectedImageId] = useState(null)
  const answers = useSelector(state => state.answers)
  useEffect(() => {
    const getResults = async answers => {
      try {
        const data = await API.getResults(answers.map(a => a.answerId))
        if (data.success && data.result) {
          setResult(data.result)
        }
        else {
          console.log("Error")
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (!result) {
      getResults(answers)
    }
  }, [answers])
  const onClickHandler = imageId => {
    setSelectedImageId(imageId)
  }

  return (
    <div className='result-wrapper'>
      <h3>Result</h3>
      {!result
        ? <Preloader />
        : <div>
          <p>{result.description}</p>
          {result.images?.length > 0 &&
            <>
              <div className='images-wrapper' >
                {result.images.map(i => (
                  <div className='image-container' key={i.id}>
                    <img
                      src={i.image}
                      alt={result.description}
                      onClick={() => onClickHandler(i.id)}
                    />
                  </div>
                ))}
              </div>
              {selectedImageId &&
                <div
                  id='lightbox'
                  onClick={() => setSelectedImageId(null)}
                >
                  <img
                    src={result.images.find(i => i.id === selectedImageId)?.image}
                    alt={result.description}
                  />
                </div>
              }
            </>
          }
        </div>
      }
    </div>
  )
}

export default Result
