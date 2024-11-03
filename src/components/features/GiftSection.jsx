import React, { memo } from "react";
import { _giftAlbums } from "../../assets/mock/mock";

const GiftSection = memo(({ data }) => {
    return (
        <div className="relative">
            <div className="flex flex-col gap-4">
                <div className="p-2 !bg-[#fbfbfb74] rounded-lg shadow-sm ">

                    {Array.isArray(data)
                        ? data.map((message, index) => (
                              <div
                                  className="text-lg p-2 text-start"
                                  key={index}
                              >
                                  {message}
                              </div>
                          ))
                        : null}
                </div>
                <div className="p-4 py-8 flex flex-col text-center gap-4 rounded-lg items-center">
                    <p className="font-bold text-[#f78da4] text-xl">
                        ขวัญปีนี้
                    </p>
                    <div className="w-[300px] h-[380px] rounded-lg shadow-lg">
                        <img
                            src={_giftAlbums}
                            alt={`image_${_giftAlbums}`}
                            loading="lazy"
                            className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default GiftSection;
