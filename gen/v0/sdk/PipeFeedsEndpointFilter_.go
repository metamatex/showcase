// generated by metactl sdk gen 
package sdk

const (
	PipeFeedsEndpointFilterName = "PipeFeedsEndpointFilter"
)

type PipeFeedsEndpointFilter struct {
    And []PipeFeedsEndpointFilter `json:"and,omitempty" yaml:"and,omitempty"`
    Not []PipeFeedsEndpointFilter `json:"not,omitempty" yaml:"not,omitempty"`
    Or []PipeFeedsEndpointFilter `json:"or,omitempty" yaml:"or,omitempty"`
    Set *bool `json:"set,omitempty" yaml:"set,omitempty"`
}