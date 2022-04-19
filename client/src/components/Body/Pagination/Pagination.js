import React from 'react'

export default function Pagination() {
    return (
        <div className="post__pagination">
            <div className="post__pagination--left"><i className="fa fa-angle-left" /></div>
            <div className="post__pagination--center">
                <button className="btn btn-primary">1</button>
                <button className="btn btn-primary">2</button>
                <button className="btn btn-primary">3</button>
                <button className="btn btn-primary">4</button>
                <button className="btn btn-primary">5</button>
                <button className="btn btn-primary">...</button>
                <button className="btn btn-primary">99</button>
            </div>
            <div className="post__pagination--right"><i className="fa fa-angle-right" /></div>
        </div>
    )
}
