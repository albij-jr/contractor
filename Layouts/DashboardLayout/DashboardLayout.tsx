import Image from 'next/image'
import React from 'react'
import MetaHeader from '../../Modules/GlobalComponents/MetaHeader'
import { MetaHeaderProps } from '../../types/props-types'
import styles from './DashboardLayout.module.css'

const DashboardLayout : React.FC<MetaHeaderProps> = ({
  meta,
  children,
  title
}) => {
  return (
    <div className={styles.container}>
      <MetaHeader title={ title } meta={meta}></MetaHeader>      
      {children}
    </div>
  )
}

export default DashboardLayout