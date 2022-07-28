import React from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout/DashboardLayout'

import ContractorsPage from '../../Modules/Pages/Contactractors/contractors'

function index() {
  return (
    <DashboardLayout
    title={'List of contractors'}
    meta={[]}
    >
      <ContractorsPage></ContractorsPage>
    </DashboardLayout>
  )
}

export default index