import { useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form'
import { Box, Button, Checkbox, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { Country, State, City } from 'country-state-city';
import { useAuth } from "../../utils/AuthContext";
import { BASE_URL } from "../signin/constants";
import axios from "axios";

interface VendorFirstLoginFormProps {
    is_first_time_login: boolean; // Specify the type of the prop
}

const VendorFirstLoginForm = ({ is_first_time_login }: VendorFirstLoginFormProps) => {
    const countries = Country.getAllCountries()
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // Initialize with null
    const [selectedStates, setSelectedStates] = useState<State[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const [fullWidth, setFullWidth] = useState(true);
    const [open, setOpen] = useState(is_first_time_login);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
    const { control, register, handleSubmit, formState: { errors }, watch } = useForm()

    // get access toke from Auth Context
    const { accessToken } = useAuth();


    const handleCheckboxChange = (value: string) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };



    useEffect(() => {
        // Fetch and update the list of states whenever the selected country changes
        if (selectedCountry) {
            const selectedCountryData = countries.find(country => country.name === selectedCountry);
            if (selectedCountryData) {
                const countryStates = State.getStatesOfCountry(selectedCountryData.isoCode);
                setSelectedStates(countryStates);
            }
        }
    }, [selectedCountry, countries]); // include `countries` as a dependency


    const onSubmit =    async (data: any) => {

        data.country = selectedCountry;
        data.selectedOptions = selectedOptions;
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the accessToken
            },
        };
        
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/vendors/`, data, config);
            console.log('API Response:', response.data);
            
        } catch (error) {
            console.error('API Error:', error);
            
        }
    };



    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
        >
            <DialogTitle>Vendors Information</DialogTitle>
            <Divider />
            <DialogContent>
                <DialogContentText>
                    Kindly fill the information inorder to proceed
                </DialogContentText>
                <Box sx={{ mt: 2 }} >
                    <Box component="form" noValidate autoComplete="off"
                        onSubmit={
                            handleSubmit(onSubmit)
                        }
                    >
                        <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                        <Controller
                            name="country"
                            control={control}
                            rules={{ required: false }}
                            render={({ field }) => (
                                <>

                                    <Select
                                        {...field}
                                        autoFocus
                                        fullWidth
                                        inputProps={{
                                            name: 'country',
                                            id: 'country',
                                        }}
                                        value={selectedCountry || ''}
                                        onChange={event => setSelectedCountry(event.target.value)}
                                    >
                                        {countries &&
                                            countries.map((country) => (
                                                <MenuItem key={country.isoCode} value={country.name}>
                                                    {country.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                    {errors.country && <span>This field is required</span>}
                                </>
                            )}
                        />

                        <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                        <Controller
                            name="state"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    fullWidth
                                    inputProps={{
                                        name: 'state',
                                        id: 'state',
                                    }}
                                >
                                    {selectedStates && selectedStates.map(state => (
                                        <MenuItem key={state.stateCode} value={state.name}>
                                            {state.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />


                        <Box sx={{ mt: 2 }}>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField {...field} label="City" variant="outlined" fullWidth error={!!errors.city} />
                                )}
                            />
                            {errors.city && <span>This field is required</span>}
                        </Box>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="farmProduce"
                                        value="farmProduce"
                                        checked={selectedOptions.includes("farmProduce")}
                                        onChange={() => handleCheckboxChange("farmProduce")}
                                    />
                                }
                                label="Farm Produce"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="poultry"
                                        value="poultry"
                                        checked={selectedOptions.includes("poultry")}
                                        onChange={() => handleCheckboxChange("poultry")}
                                    />
                                }
                                label="Poultry"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="fish"
                                        value="fish"
                                        checked={selectedOptions.includes("fish")}
                                        onChange={() => handleCheckboxChange("fish")}
                                    />
                                }
                                label="Fish"
                            />
                        </FormGroup>




                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

        </Dialog >
    );
};

export default VendorFirstLoginForm;
