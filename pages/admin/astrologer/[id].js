import React from 'react'
import { useRouter } from "next/router";

function astrologer() {
      const router = useRouter();
      const { pid } = router.query;

    return (
        <div>
            hey
            
        </div>
    )
}

export default astrologer
