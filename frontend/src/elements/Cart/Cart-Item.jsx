function CartItem({Delete,id,cover,title,price}) {
    return (
            <li className="item" >
                <div className="item__icon-name">
                    <span className="item__track-icon"><img src={cover} alt='icon'/></span>
                    <span className="item__track-name">{title}</span>
                </div>
                <div className="item__track-price"><span>$</span>{price}</div>
                <div className="item__close" onClick={()=>{Delete(id)}}></div>
            </li>
    );
}

export default CartItem;