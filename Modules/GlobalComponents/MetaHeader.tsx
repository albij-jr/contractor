import Head from 'next/head'
import React from 'react'
import { MetaElement, MetaHeaderProps } from '../../types/props-types'

const MetaHeader : React.FC<MetaHeaderProps> = ({
    meta = [],
    children,
    title = "Contractor"
}) =>  {
  return (
    <Head>
        <title>{ title }</title>
        {meta.map((metaElement : MetaElement) => {
            return (
                <meta name={metaElement.name} content={metaElement.description} />
            )
        })}
        {children}
        <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MetaHeader