'use client';

import React from 'react';

export default function Bottle3D() {
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
            <div className="sketchfab-embed-wrapper" style={{ width: '80%', maxWidth: '1200px', height: '600px' }}>
                <iframe
                    title="photorealistic 3D model."
                    frameBorder="0"
                    allowFullScreen
                    src="https://sketchfab.com/models/188726518db74db99574f3f37cf0d7d7/embed"
                    style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                ></iframe>
                <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A', textAlign: 'center' }}>
                    <a
                        href="https://sketchfab.com/3d-models/photorealistic-3d-model-188726518db74db99574f3f37cf0d7d7?utm_medium=embed&utm_campaign=share-popup&utm_content=188726518db74db99574f3f37cf0d7d7"
                        target="_blank"
                        rel="nofollow"
                        style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                        photorealistic 3D model.
                    </a> by <a
                        href="https://sketchfab.com/flamzy?utm_medium=embed&utm_campaign=share-popup&utm_content=188726518db74db99574f3f37cf0d7d7"
                        target="_blank"
                        rel="nofollow"
                        style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                        flamzy
                    </a> on <a
                        href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=188726518db74db99574f3f37cf0d7d7"
                        target="_blank"
                        rel="nofollow"
                        style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                        Sketchfab
                    </a>
                </p>
            </div>
        </div>
    );
}
