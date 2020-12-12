//API access via backend

export async function getVehicles() {
    const res = await fetch('http://localhost:4000/api/sixt/vehmodellist?cit=11')
    return res.json()
}