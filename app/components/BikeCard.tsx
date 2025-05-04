<div className="flex items-center gap-2">
  <span className="text-lg font-bold">₹{bike.price.toLocaleString()}</span>
  {bike.isElectric && bike.subsidyPrice && (
    <span className="text-sm text-gray-500 line-through">
      ₹{bike.subsidyPrice.toLocaleString()}
    </span>
  )}
</div>;
