import React, { useState } from 'react';
import { Grid, FormControl, Button, Slider, RadioGroup, FormControlLabel, Radio, Checkbox, Typography, Divider, Paper, Box, Rating } from '@mui/material';

const platforms = [
    { label: '백준', value: 'baekjoon' },
    { label: '프로그래머스', value: 'programmers' },
    { label: 'SWEA', value: 'swea' },
    { label: '소프티어', value: 'softeer' }
    // 다른 플랫폼 추가 가능
];

const sorts = [
    {id:0, label: '최근 순', isDescending: true, key: "FoundDate" },
    {id:1, label: '오래된 순', isDescending: false, key: "FoundDate" },
    {id:2, label: '난이도 높은 순', isDescending: true, key: "Level" },
    {id:3, label: '난이도 낮은 순', isDescending: false, key: "Level" }
];
const AdvancedSearchMenu = ({
    onChangePlatform, onChangeAllPlatform, selectedPlatforms, selectedAll,
    onChangeSort, sort,
    onChangeLevelRange, lastLevelRange
}: any) => {

    //const [difficultyRange, setDifficultyRange] = useState<number[]>([0, 5]);
    //const [sortBy, setSortBy] = useState(sorts[sortId].key+sorts[sortId].isDescending);

    const [levelRange, setLevelRange] = useState<number[]>(lastLevelRange);

    const handleDifficultyChange = (event: any, newValue: number | number[]) => {
        setLevelRange(newValue as number[])
        onChangeLevelRange(newValue as number[], false);
    };
    const handleDifficultyChangeFinished = (event: any, newValue: number | number[]) => {
        
        onChangeLevelRange(newValue as number[], true);
    };

    const handlePlatformChange = (platform: string) => {
        onChangePlatform(platform, platforms);
    };

    const handleSelectAllPlatforms = () => {
        onChangeAllPlatform();

    };


    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Grid container spacing={3} >
                {/* 플랫폼 선택 */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        플랫폼
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        <Button
                            variant={selectedAll ? 'contained' : 'outlined'}
                            onClick={handleSelectAllPlatforms}
                            size="small"
                        >
                            전체
                        </Button>
                        {platforms.map(platform => (
                            <Button
                                key={platform.value}
                                variant={selectedPlatforms.includes(platform.value) ? 'contained' : 'outlined'}
                                onClick={() => handlePlatformChange(platform.value)}
                                size="small"
                            >
                                {platform.label.charAt(0).toUpperCase() + platform.label.slice(1)}
                            </Button>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                {/* 난이도 선택 */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        난이도
                    </Typography>

                    <Box sx={{ width: '75%', mx: 'auto' }}>
                        <Slider
                            value={levelRange}
                            onChange={handleDifficultyChange}
                            onChangeCommitted={handleDifficultyChangeFinished}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                            step={0.1}
                            marks={[
                                { value: 0, label: '0 단계' },
                                { value: 5, label: '5 단계' },
                            ]}
                        />

                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                {/* 정렬 기준 선택 */}
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        정렬 기준
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup row value={!sort? sorts[0].id : sort.id} onChange={(e) => onChangeSort(sorts[Number(e.target.value)])}>
                            {sorts.map(s => (
                                <FormControlLabel key={s.id} value={s.id} control={<Radio />} label={s.label} />
                            ))
                            }
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        북마크
                    </Typography>
                </Grid>


            </Grid>
        </Paper>
    );
};

export default AdvancedSearchMenu;